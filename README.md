# 🎴 Magic: The Gathering Card Generator

A web application that allows you to create custom Magic: The Gathering cards using HTML, CSS, and JavaScript. Based on the CSS implementation from Davide Iaiunese's article "Make a Magic: The Gathering card in CSS".

## Features

- **Real-time Card Preview**: See your card update as you type
- **Customizable Elements**:
  - Card name
  - Mana cost (with official MTG mana symbols)
  - Card type
  - Card artwork (via URL)
  - Card text and abilities
  - Flavor text
  - Set information
  - Artist credit
  - Color themes (Green, White, Blue, Black, Red, Colorless)

- **Interactive Controls**:
  - Generate card button
  - Download card as PNG image
  - Reset form to default values
  - Mobile-responsive design

## How to Use

1. **Open the App**: Open `index.html` in your web browser
2. **Fill in Card Details**: Use the form on the left to customize your card
3. **Real-time Preview**: Watch your card update in real-time on the right
4. **Generate Card**: Click "Generate Card" to apply all changes
5. **Download**: Click "Download Card" to save your creation as a PNG image
6. **Reset**: Click "Reset" to return to the default Oath of Nissa example

## File Structure

```
mtg-card-generator/
├── index.html          # Main HTML file
├── styles.css          # CSS styling (includes MTG card CSS from article)
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Card Customization Options

### Basic Information
- **Card Name**: The name that appears at the top of the card
- **Mana Cost**: Choose from Green, White, Blue, Black, Red, or Colorless mana symbols
- **Card Type**: Examples: "Legendary Enchantment", "Creature - Human Wizard", etc.

### Visual Elements
- **Card Art**: Provide a URL to an image for the card artwork
- **Card Color Theme**: Changes the background pattern and border colors

### Text Content
- **Card Text**: The main rules text and abilities
- **Flavor Text**: Italicized lore text (optional)

### Set Information
- **Set Code**: 3-letter set abbreviation (e.g., "OGW")
- **Collector Number**: Format like "140/184 R" (number/total rarity)
- **Artist**: Credit for the card artwork

## Technical Details

### Dependencies
- **Mana Font**: Official MTG mana symbols from Andrew Gioia
- **html2canvas**: For high-quality card image downloads
- **Modern CSS**: Grid layout, Flexbox, CSS custom properties
- **Vanilla JavaScript**: No framework dependencies

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement for download functionality

### Performance Optimizations
- Lazy loading of external libraries
- Efficient DOM manipulation
- Optimized CSS with minimal reflows
- Compressed image formats for backgrounds

## Customization

### Adding New Mana Types
Edit the `manaCostSelect` options in `index.html` and corresponding color mappings in `script.js`.

### Modifying Card Colors
Update the color theme CSS classes in `styles.css` and the `borderColorMap` in `script.js`.

### Changing Default Card
Modify the default values in the `resetForm()` method in `script.js`.

## Credits

- **Original CSS Implementation**: Davide Iaiunese's "Make a Magic: The Gathering card in CSS"
- **Mana Symbols**: Andrew Gioia's Mana Font library
- **Card Design**: Wizards of the Coast (Magic: The Gathering)
- **Default Card**: Oath of Nissa from Oath of the Gatewatch

## License

This project is for educational and personal use only. Magic: The Gathering is a trademark of Wizards of the Coast LLC.

## Future Enhancements

- [ ] Multiple mana cost symbols
- [ ] Power/Toughness for creatures
- [ ] Different card frames (artifact, land, etc.)
- [ ] Card set symbol customization
- [ ] Batch card generation
- [ ] Save/load card templates
- [ ] Export to different formats (PDF, SVG)

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start creating your custom MTG cards!

No build process or server required - just open and use! 