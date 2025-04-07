# Pinia の$subscribe の挙動を確認するテストコード

[Pinia](https://pinia.vuejs.org/) の \$subscribe が思い通りに動かなかったので、再現用のテストコードを書いたものです。

症状としては、state の変数を更新しているのに、\$subscribe したコールバック関数が呼ばれないことがあります。 
$patch で更新した場合は必ず呼ばれますが、direct 更新の場合は前後の処理に依存して呼ばれたり呼ばれなかったりしました。

Pinia の公式ドキュメントを読んでも解決しなかったので Web 情報をググってみたら、[何やらそれらしき情報](https://github.com/vuejs/pinia/issues/992)を発見。  
Pinia の内部実装を見ると、$patch 処理と同じタイミングでの direct 更新の subscription を取りこぼしてしまうらしい。
詳しいことは分からないけど、識者らしき人のコメントによると devtools を破綻させないための事情みたい。
flush: 'sync'をつければ回避できるようだけど、使い方によって望まない粒度で大量のコールバックが発生してしまうので難しい..。
2022 年の議論だけど、2025 年 4 月現在(Pinia 3.0.1)でもそのままみたいですね。

このリポジトリは、問題を再現させる Vue の[テストアプリ](https://tmura-zzz.github.io/test-pinia-subscribe/)のコードです。  
Pinia で state に counter があり、アプリを動かすと以下のボタンが出ます。

- Run Test (only direct)
  - direct 更新で counter をインクリメント
- Run Test (only patch)
  - $patch で counter をインクリメント
- Run Test (direct + patch)
  - direct と$patch の両方で counter をインクリメント ※1 回押すと+2 される
- Reset
  - counter をリセットする
  </dl>
  ボタンを押すと下部に表示しているcounterの値が変わります。

direct_counter は、\$subscribe したコールバック関数で direct 更新（mutation.type='direct'）を検知したら+1 します。  
patch_counter は、\$patch 更新（mutation.type='patch object'）を検知したら+1 します。  
direct と$patch の両方でインクリメントしたときだけ結果が期待通りではなく、direct_counter が増えません。  
counter は正しく+2 ずつ増えるので、state は更新されてるけど direct の\$subscribe が来ないことが変わります。

要するに、\$subscribe を使う場合、mutation の方法として**direct と\$patch を混ぜて使ってはいけない**ということなのですね。

$subscribe のコールバック内で state をいじることがあるので、呼出しがネストしないように使い分けるつもりでしたが残念..  
まあ分かっていれば $onAction の方でやりたいことはできるので問題なし。
