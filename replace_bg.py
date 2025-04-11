from PIL import Image

def replace_transparency_with_white(input_path, output_path):
    # Open the image
    img = Image.open(input_path).convert("RGBA")

    # Replace transparent background with white
    img_with_white_bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    img_with_white_bg.paste(img, (0, 0), img)

    # Save the result
    img_with_white_bg.save(output_path, format="PNG")

# Run the function
replace_transparency_with_white("input.png", "output_with_white_bg.png")
