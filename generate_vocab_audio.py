import asyncio
import edge_tts
import os

# All unique vocab words from hsk1_lessons.ts that need audio
WORDS = [
    # Lesson 1
    "你好", "您好", "你们好", "对不起", "没关系",
    # Lesson 2 - 15 (add as you get them, or run for all lessons)
    # For now, common greetings and basic words:
    "谢谢", "再见", "老师", "同学", "朋友",
    "我", "他", "她", "我们", "他们",
    "是", "不是", "有", "没有", "在",
    "这", "那", "哪", "什么", "谁",
    "一", "二", "三", "四", "五",
    "六", "七", "八", "九", "十",
    "百", "千", "万", "零",
    "今天", "明天", "昨天", "现在", "以前",
    "年", "月", "日", "号", "星期",
    "上午", "下午", "晚上", "早上",
    "中国", "北京", "上海", "学校", "家",
    "中文", "汉语", "英语", "日语",
    "学习", "工作", "吃饭", "喝水", "睡觉",
    "去", "来", "回", "走", "坐",
    "看", "听", "说", "写", "读",
    "大", "小", "多", "少", "贵",
    "好吃", "好喝", "漂亮", "高兴", "累",
    "热", "冷", "快", "慢",
    "人", "书", "水", "饭", "茶",
    "咖啡", "苹果", "西瓜", "米饭", "面条",
    "医生", "学生", "司机", "厨师",
    "爸爸", "妈妈", "哥哥", "姐姐", "弟弟", "妹妹",
    "儿子", "女儿", "丈夫", "妻子",
    "飞机", "火车", "出租车", "公共汽车",
    "医院", "商店", "饭馆", "银行",
    "电话", "手机", "电脑", "电视",
    "钱", "块", "毛", "分",
    "岁", "名字", "国籍",
]

OUTPUT_DIR = r"assets\audio"

async def generate(text: str):
    filename = os.path.join(OUTPUT_DIR, f"{text}.mp3")
    if os.path.exists(filename):
        print(f"  skip: {text}")
        return
    try:
        communicate = edge_tts.Communicate(text, "zh-CN-XiaoxiaoNeural", rate="-10%")
        await communicate.save(filename)
        print(f"  done: {text}")
    except Exception as e:
        print(f"  FAIL: {text} — {e}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Generating {len(WORDS)} audio files...")
    # Process in batches of 10 to avoid rate limiting
    for i in range(0, len(WORDS), 10):
        batch = WORDS[i:i+10]
        await asyncio.gather(*[generate(w) for w in batch])
    print("All done!")

asyncio.run(main())
