# ATMT (Advanced Trial Making Test) Web Application

https://atmt-web.herokuapp.com/

Random Task (ATMT Task R) and the Advanced Trail Making Test Fixed Task (ATMT Task F)

→ [VR Version](https://github.com/huxianyin/ATMT_VR.git)

<img src="./atmt.gif" width="100">


# Prerequisites
- react-chartjs-2
- mui/icons-material

# Usage

- 起動すると最初に設定画面が表示される．デフォルトから変更する場合は各種入力し`NEXT`を押す（この画面は被験者には見せないこと）
- 保存先:フォルダ: ./results/
- 結果ファイル: .csv形式で、`マークid，マークをクリックするまでの所要時間`が記録されている．
- 途中で実験を破棄してトップに戻りたい場合は`reset`ボタンを押すこと
