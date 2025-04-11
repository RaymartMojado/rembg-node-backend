from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from rembg import remove, new_session
import io

app = FastAPI()

# Initialize session once with custom model and background color
session = new_session(
    model_name="birefnet-portrait",
    bgcolor=(255, 255, 255, 255)
)

@app.post("/")
async def remove_bg(file: UploadFile = File(...)):
    image_data = await file.read()

    # Use the session for processing
    output_data = remove(image_data, session=session)

    output_io = io.BytesIO(output_data)
    output_io.seek(0)

    return StreamingResponse(output_io, media_type="image/png")
