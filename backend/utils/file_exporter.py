from datetime import datetime

def build_filename(index):
    timestamp = datetime.now().strftime("%d-%m-%y")
    filename = f"Batch_{index}_{timestamp}"

    return filename