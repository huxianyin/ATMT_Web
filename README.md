# ATMT (Advanced Trial Making Test) Web Application

ATMT test with fixed (ATMT-F) and random (ATMT-R) version.

→ [VR Version](https://github.com/huxianyin/ATMT_VR.git)

You can play here → https://atmt-web.herokuapp.com/


![atmt_web](https://user-images.githubusercontent.com/34026599/177086671-e4878e80-1d05-4e09-aede-bc6d90aa1685.gif)


# Prerequisites
- react-chartjs-2
- mui/icons-material

# Usage

- 起動すると最初に設定画面が表示される.デフォルトから変更する場合は各種入力し`NEXT`を押す
- 実験終了後,結果ファイル`exp_name.csv`がダンロードできます．
- 結果データ:最初の行は課題設定．その後に`マークid(item_id)，　押した時間(timestamp), 反応時間(reaction_time)，セッション名(phase)`のデータが記録されてます．
- 途中で実験を破棄して設定画面に戻りたい場合は`reset`ボタンを押してください.
