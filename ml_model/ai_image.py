from replicate.utils import generate_image
from replicate.settings import Setting

def generate_replicate_image(output_image_path):
    settings = Setting()
    settings.set_preset("deepart.io")
    
    generate_image(output_image_path, settings)

if __name__ == "__main__":
    output_image_path = "generated_image.jpg"
    generate_replicate_image(output_image_path)