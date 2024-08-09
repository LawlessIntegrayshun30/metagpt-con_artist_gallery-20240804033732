ai/ArtGenerator.js
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, UpSampling2D
import numpy as np

class ArtGenerator:
    def __init__(self, input_shape=(256, 256, 3), latent_dim=100):
        self.input_shape = input_shape
        self.latent_dim = latent_dim
        self.model = self._build_model()

    def _build_model(self):
        model = Sequential()

        Encoder
        model.add(Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=self.input_shape))
        model.add(MaxPooling2D((2, 2), padding='same'))
        model.add(Conv2D(64, (3, 3), activation='relu', padding='same'))
        model.add(MaxPooling2D((2, 2), padding='same'))
        model.add(Conv2D(128, (3, 3), activation='relu', padding='same'))
        model.add(MaxPooling2D((2, 2), padding='same'))

        Decoder
        model.add(Conv2D(128, (3, 3), activation='relu', padding='same'))
        model.add(UpSampling2D((2, 2)))
        model.add(Conv2D(64, (3, 3), activation='relu', padding='same'))
        model.add(UpSampling2D((2, 2)))
        model.add(Conv2D(32, (3, 3), activation='relu', padding='same'))
        model.add(UpSampling2D((2, 2)))
        model.add(Conv2D(3, (3, 3), activation='sigmoid', padding='same'))

        return model

    def generate_art(self):
        # Generate random latent variables
        random_latent_vectors = np.random.normal(size=(1, self.latent_dim))
        # Predict the output (artwork) from the random latent vectors
        generated_art = self.model.predict(random_latent_vectors)
        # Rescale the generated art to 0-255 pixel values for display
        generated_art = (generated_art * 255).astype(np.uint8)
        return generated_art

# Example usage:
art_generator = ArtGenerator()
generated_art = art_generator.generate_art()
This generated_art can now be saved or processed further for display.
