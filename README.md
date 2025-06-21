# 🎴 MTG Card Generator

A beautiful, responsive web application for creating custom Magic: The Gathering cards with professional styling and effects.

## ✨ Features

- **🎨 Custom Card Creation**: Design your own MTG cards with all the classic elements
- **📱 Mobile-First Design**: Optimized for all devices with responsive layout
- **🖼️ Image Support**: Upload your own artwork or use external URLs
- **💫 Visual Effects**: Multiple card conditions and special effects (foil, holographic, etc.)
- **📥 Download Functionality**: Save your cards as high-quality PNG images
- **🎯 Real-time Preview**: See changes instantly as you edit

## 🚀 Live Demo

**[Try it now!](https://YOUR_USERNAME.github.io/mtg-card-generator/)**

## 📋 How to Use

1. **Card Details**: Fill in the card name, mana cost, type, and description
2. **Artwork**: Upload an image or paste an image URL
3. **Styling**: Choose card colors, condition, and special effects
4. **Download**: Click "Download Card" to save your creation
5. **Reset**: Use the reset button to return to default values

## 🛠️ Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling with mobile-first approach
- **JavaScript** - Interactive functionality
- **html2canvas** - Image generation and download
- **Mana Font** - Official MTG mana symbols

## 🎨 Card Customization Options

### Card Information
- Card Name (up to 30 characters)
- Mana Cost (Green, White, Blue, Black, Red, Colorless)
- Card Type (Creature, Spell, Enchantment, etc.)
- Card Text (up to 300 characters)
- Flavor Text (up to 150 characters)

### Metadata
- Set Code (3 characters)
- Collector Number
- Artist Name
- Copyright Text

### Visual Styling
- **Color Themes**: Green, White, Blue, Black, Red, Colorless
- **Conditions**: Mint, Lightly Played, Moderately Played, Heavily Played, Damaged, Rusty & Ancient
- **Special Effects**: None, Foil, Holographic, Rainbow Foil, Etched Foil, Textured Foil, Galaxy Foil, Prism Foil

## 🖥️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/mtg-card-generator.git
cd mtg-card-generator
```

2. Start a local server:
```bash
# Python 3
python3 -m http.server 8000

# Node.js (if you have it)
npx serve .

# Or use any other static server
```

3. Open your browser to `http://localhost:8000`

## 📁 Project Structure

```
mtg-card-generator/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── styles.css          # CSS styling
├── README.md          # This file
├── test-rusty.html    # Test page
└── .gitignore         # Git ignore rules
```

## 🔧 Features in Detail

### Download Functionality
- **High-Quality Export**: Uses html2canvas for pixel-perfect card rendering
- **Fallback Methods**: Multiple download options for maximum compatibility
- **Cross-Origin Support**: Handles external images with CORS
- **Mobile Compatible**: Works on all devices and browsers

### Responsive Design
- **Mobile-First**: Optimized for touch interfaces
- **Progressive Enhancement**: Works on all screen sizes
- **Accessible**: Proper contrast ratios and semantic HTML

### SEO Optimized
- **Semantic HTML**: Proper heading hierarchy and structure
- **Meta Tags**: Optimized for search engines and social sharing
- **Performance**: Optimized loading and rendering

## 🎯 Default Card Template

The app comes with a default "Keira Vask, Architect of Orbit" card that showcases all features:

- **Name**: Keira Vask, Architect of Orbit
- **Type**: Legendary Enchantment
- **Mana Cost**: Blue
- **Effect**: "When Keira Vask enters the battlefield, look at the top three cards of your library..."
- **Flavor**: "Velocity is a myth. Everything moves exactly as I intend."

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Wizards of the Coast** for creating Magic: The Gathering
- **Mana Font** for the official mana symbols
- **html2canvas** library for image generation
- **Community** for feedback and suggestions

---

**Made with ❤️ for the Magic: The Gathering community** 