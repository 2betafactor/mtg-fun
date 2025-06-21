// MTG Card Generator JavaScript

class MTGCardGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadInitialCard();
        this.uploadedImageData = null; // Store uploaded image data
    }

    initializeElements() {
        // Form elements
        this.form = document.getElementById('cardForm');
        this.cardNameInput = document.getElementById('cardName');
        this.manaCostSelect = document.getElementById('manaCost');
        this.cardTypeInput = document.getElementById('cardType');
        this.cardArtInput = document.getElementById('cardArt');
        this.cardArtFileInput = document.getElementById('cardArtFile');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.uploadStatus = document.getElementById('uploadStatus');
        this.artUploadSection = document.querySelector('.art-upload-section');
        this.cardTextArea = document.getElementById('cardText');
        this.flavorTextArea = document.getElementById('flavorText');
        this.setCodeInput = document.getElementById('setCode');
        this.collectorNumberInput = document.getElementById('collectorNumber');
        this.artistInput = document.getElementById('artist');
        this.copyrightTextInput = document.getElementById('copyrightText');
        this.cardColorSelect = document.getElementById('cardColor');
        this.cardConditionSelect = document.getElementById('cardCondition');
        this.cardEffectSelect = document.getElementById('cardEffect');

        // Buttons
        this.downloadBtn = document.getElementById('downloadCard');
        this.resetBtn = document.getElementById('resetForm');

        // Card elements
        this.cardPreview = document.getElementById('cardPreview');
        this.cardViewport = document.querySelector('.card-viewport');
        this.cardBackground = this.cardPreview.querySelector('.card-background');
        this.cardName = this.cardPreview.querySelector('.name');
        this.manaIcon = this.cardPreview.querySelector('#mana-icon');
        this.cardType = this.cardPreview.querySelector('.type');
        this.cardArt = this.cardPreview.querySelector('.frame-art');
        this.cardDescription = this.cardPreview.querySelector('.description');
        this.cardFlavor = this.cardPreview.querySelector('.flavour-text');
        this.leftInfo = this.cardPreview.querySelector('.fbi-left');
        this.rightInfo = this.cardPreview.querySelector('.fbi-right');


    }

    bindEvents() {
        this.downloadBtn.addEventListener('click', () => this.downloadCard());
        this.resetBtn.addEventListener('click', () => this.resetForm());
        
        // Add debug download for testing
        this.downloadBtn.addEventListener('dblclick', () => this.debugDownload());

        // File upload events
        this.uploadBtn.addEventListener('click', () => this.cardArtFileInput.click());
        this.cardArtFileInput.addEventListener('change', (e) => this.handleFileUpload(e));

        // Drag and drop events
        this.artUploadSection.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.artUploadSection.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.artUploadSection.addEventListener('drop', (e) => this.handleFileDrop(e));

        // Real-time updates
        this.cardNameInput.addEventListener('input', () => this.updateCardName());
        this.manaCostSelect.addEventListener('change', () => this.updateManaCost());
        this.cardTypeInput.addEventListener('input', () => this.updateCardType());
        this.cardArtInput.addEventListener('input', () => this.updateCardArt());
        this.cardTextArea.addEventListener('input', () => this.updateCardText());
        this.flavorTextArea.addEventListener('input', () => this.updateFlavorText());
        this.cardColorSelect.addEventListener('change', () => this.updateCardColor());
        this.cardConditionSelect.addEventListener('change', () => this.updateCardCondition());
        this.cardEffectSelect.addEventListener('change', () => this.updateCardEffect());
        this.setCodeInput.addEventListener('input', () => this.updateBottomInfo());
        this.collectorNumberInput.addEventListener('input', () => this.updateBottomInfo());
        this.artistInput.addEventListener('input', () => this.updateBottomInfo());
        this.copyrightTextInput.addEventListener('input', () => this.updateBottomInfo());
    }

    loadInitialCard() {
        this.generateCard();
    }

    generateCard() {
        this.updateCardName();
        this.updateManaCost();
        this.updateCardType();
        this.updateCardArt();
        this.updateCardText();
        this.updateFlavorText();
        this.updateCardColor();
        this.updateCardCondition();
        this.updateCardEffect();
        this.updateBottomInfo();
        this.showSuccessMessage('Card generated successfully!');
    }

    updateCardName() {
        const name = this.cardNameInput.value.trim() || 'Card Name';
        this.cardName.textContent = name;
    }

    updateManaCost() {
        const manaCost = this.manaCostSelect.value;
        this.manaIcon.className = `ms ${manaCost}`;
        
        // Update mana icon background color based on selection
        const colorMap = {
            'ms-g': '#ADD3AC', // Green
            'ms-w': '#FFFBD5', // White
            'ms-u': '#0E68AB', // Blue
            'ms-b': '#150B00', // Black
            'ms-r': '#D3202A', // Red
            'ms-c': '#CCCCCC'  // Colorless
        };
        
        this.manaIcon.style.background = colorMap[manaCost] || '#CCCCCC';
        this.manaIcon.style.color = manaCost === 'ms-b' ? 'white' : 'black';
    }

    updateCardType() {
        const type = this.cardTypeInput.value.trim() || 'Card Type';
        this.cardType.textContent = type;
    }

    updateCardArt() {
        const artUrl = this.cardArtInput.value.trim();
        if (artUrl && this.isValidUrl(artUrl)) {
            // Try to convert external image to data URL for better download compatibility
            this.convertImageToDataUrl(artUrl).then(dataUrl => {
                if (dataUrl) {
                    this.cardArt.src = dataUrl;
                    // Store as uploaded image data for downloads
                    this.uploadedImageData = {
                        dataUrl: dataUrl,
                        originalUrl: artUrl
                    };
                    console.log('Image converted to data URL for download compatibility');
                } else {
                    // Fallback to direct URL
                    this.cardArt.src = artUrl;
                    this.uploadedImageData = null;
                }
            }).catch(() => {
                // Fallback to direct URL
                this.cardArt.src = artUrl;
                this.uploadedImageData = null;
            });
            
            this.cardArt.onerror = () => {
                this.cardArt.src = 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Card+Art';
                this.showErrorMessage('Failed to load image. Using placeholder.');
            };
        } else {
            this.cardArt.src = 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Card+Art';
            this.uploadedImageData = null;
        }
    }
    
    async convertImageToDataUrl(url) {
        return new Promise((resolve) => {
            try {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        const dataUrl = canvas.toDataURL('image/png');
                        resolve(dataUrl);
                    } catch (error) {
                        console.warn('Failed to convert image to data URL:', error);
                        resolve(null);
                    }
                };
                
                img.onerror = () => {
                    console.warn('Failed to load image for conversion:', url);
                    resolve(null);
                };
                
                img.src = url;
            } catch (error) {
                console.warn('Error in convertImageToDataUrl:', error);
                resolve(null);
            }
        });
    }

    updateCardText() {
        const text = this.cardTextArea.value.trim() || 'Card text goes here.';
        this.cardDescription.textContent = text;
    }

    updateFlavorText() {
        const flavorText = this.flavorTextArea.value.trim();
        this.cardFlavor.textContent = flavorText;
        this.cardFlavor.style.display = flavorText ? 'block' : 'none';
    }

    updateCardColor() {
        const color = this.cardColorSelect.value;
        
        // Remove existing color classes
        this.cardBackground.classList.remove('white', 'blue', 'black', 'red', 'green', 'colorless');
        
        // Add new color class
        this.cardBackground.classList.add(color);

        // Update border colors based on card color
        const borderColorMap = {
            'green': '#26714A',
            'white': '#FFFBD5',
            'blue': '#0E68AB',
            'black': '#150B00',
            'red': '#D3202A',
            'colorless': '#CCCCCC'
        };

        const borderColor = borderColorMap[color] || '#26714A';
        
        // Update CSS custom property for border color
        document.documentElement.style.setProperty('--card-border-color', borderColor);
        
        // Update box shadows
        const elements = this.cardPreview.querySelectorAll('.frame-header, .frame-art, .frame-type-line');
        elements.forEach(el => {
            el.style.boxShadow = `0 0 0 1px #171314, 0 0 0 3px ${borderColor}, -2px 2px 1px 3px #171314`;
        });
        
        const textBox = this.cardPreview.querySelector('.frame-text-box');
        textBox.style.boxShadow = `0 0 0 3px ${borderColor}, -2px 2px 1px 3px #171314`;
    }

    updateCardCondition() {
        const condition = this.cardConditionSelect.value;
        console.log('Updating card condition to:', condition); // Debug log
        
        // Remove existing condition classes
        this.cardPreview.classList.remove('mint', 'lightly-played', 'moderately-played', 'heavily-played', 'damaged', 'rusty');
        
        // Add new condition class
        this.cardPreview.classList.add(condition);
        
        console.log('Card classes after update:', this.cardPreview.className); // Debug log
    }

    updateCardEffect() {
        const effect = this.cardEffectSelect.value;
        console.log('Updating card effect to:', effect); // Debug log
        
        // Remove existing effect classes
        this.cardPreview.classList.remove('effect-none', 'effect-foil', 'effect-holographic', 'effect-rainbow', 'effect-etched', 'effect-textured', 'effect-galaxy', 'effect-prism');
        
        // Add new effect class (if not none)
        if (effect !== 'none') {
            this.cardPreview.classList.add(`effect-${effect}`);
        }
        
        console.log('Card classes after effect update:', this.cardPreview.className); // Debug log
    }

    updateBottomInfo() {
        const collectorNumber = this.collectorNumberInput.value.trim() || '000/000 C';
        const setCode = this.setCodeInput.value.trim() || 'SET';
        const artist = this.artistInput.value.trim() || 'Artist Name';
        const copyrightText = this.copyrightTextInput.value.trim() || '™ & © 2024 Custom Card';
        
        this.leftInfo.innerHTML = `
            <p>${collectorNumber}</p>
            <p>${setCode} • EN ${artist}</p>
        `;
        
        this.rightInfo.textContent = copyrightText;
    }

    resetForm() {
        this.form.reset();
        
        // Reset to specific default values as requested
        this.cardNameInput.value = 'Keira Vask, Architect of Orbit';
        this.manaCostSelect.value = 'ms-u';  // Blue
        this.cardTypeInput.value = 'Legendary Enchantment';
        this.cardArtInput.value = 'https://heavy-space-web-iota.vercel.app/_next/image?url=https%3A%2F%2Foqkmcyxpgybheysmvanb.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcards%2Fart%2Fff629285-eca6-4c58-95cc-9ff24af38168%2Fartwork_1750506676477.jpg&w=3840&q=75';
        this.cardTextArea.value = 'When Keira Vask enters the battlefield, look at the top three cards of your library. You may reveal an artifact, instant, or land card from among them and put it into your hand. Put the rest on the bottom of your library in any order.';
        this.flavorTextArea.value = '"Velocity is a myth. Everything moves exactly as I intend."';
        this.setCodeInput.value = 'CH1';
        this.collectorNumberInput.value = '14/184 R';
        this.artistInput.value = 'Panic Timmy';
        this.copyrightTextInput.value = '™ & © 2016 Whales of The South';
        this.cardColorSelect.value = 'green';
        this.cardConditionSelect.value = 'mint';  // Mint (New)
        this.cardEffectSelect.value = 'none';  // None (Normal)
        
        // Reset uploaded image data
        this.uploadedImageData = null;
        if (this.removeUploadedFile) {
            this.removeUploadedFile();
        }
        
        this.generateCard();
        this.showSuccessMessage('Form reset to default values!');
    }

    downloadCard() {
        console.log('Download initiated...');
        this.showMessage('Preparing download...', 'loading');
        
        // Immediately try a simple, reliable method first
        this.simpleDownload();
    }
    
    simpleDownload() {
        try {
            // Simple method: Take screenshot of the card element
            if (typeof html2canvas !== 'undefined') {
                // Wait for images to load
                const cardArtImg = this.cardPreview.querySelector('.frame-art');
                if (cardArtImg && !cardArtImg.complete) {
                    setTimeout(() => this.simpleDownload(), 1000);
                    return;
                }
                
                html2canvas(this.cardPreview, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    logging: false
                }).then(canvas => {
                    this.triggerDownload(canvas);
                }).catch(error => {
                    console.error('html2canvas failed:', error);
                    this.fallbackDownload();
                });
            } else {
                this.fallbackDownload();
            }
        } catch (error) {
            console.error('Simple download failed:', error);
            this.fallbackDownload();
        }
    }
    
    triggerDownload(canvas) {
        try {
            const cardName = this.cardNameInput.value || 'mtg_card';
            const fileName = `${cardName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_card.png`;
            
            // Method 1: Try direct download
            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL('image/png', 0.9);
            
            // Add to body temporarily and click
            document.body.appendChild(link);
            link.style.display = 'none';
            link.click();
            document.body.removeChild(link);
            
            this.showSuccessMessage('Card downloaded successfully!');
            
            // Also open in new tab as backup
            setTimeout(() => {
                const newWindow = window.open();
                newWindow.document.write(`
                    <html><head><title>${fileName}</title></head>
                    <body style="margin:0;padding:20px;background:#f0f0f0;">
                        <h2>Right-click image → Save As...</h2>
                        <img src="${canvas.toDataURL('image/png', 0.9)}" style="max-width:100%;border:1px solid #ccc;"/>
                    </body></html>
                `);
            }, 1000);
            
        } catch (error) {
            console.error('Download trigger failed:', error);
            this.fallbackDownload();
        }
    }
    
    fallbackDownload() {
        this.showMessage('Using backup download method...', 'loading');
        
        // Create a simple representation
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 560;
        
        // Draw card background
        ctx.fillStyle = '#2b1810';
        ctx.fillRect(0, 0, 400, 560);
        
        // Add border
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 8;
        ctx.strokeRect(4, 4, 392, 552);
        
        // Add text information
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.cardNameInput.value || 'MTG Card', 200, 50);
        
        ctx.font = '18px Arial';
        ctx.fillText(this.cardTypeInput.value || 'Card Type', 200, 350);
        
        // Add description (simplified)
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        const text = this.cardTextArea.value || 'Card description';
        const words = text.split(' ');
        let line = '';
        let y = 380;
        
        for (let i = 0; i < words.length && y < 500; i++) {
            const testLine = line + words[i] + ' ';
            if (ctx.measureText(testLine).width > 360) {
                ctx.fillText(line, 20, y);
                line = words[i] + ' ';
                y += 20;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, 20, y);
        
        // Add note
        ctx.font = '12px Arial';
        ctx.fillStyle = '#ccc';
        ctx.textAlign = 'center';
        ctx.fillText('(Simplified version - artwork not included)', 200, 530);
        
        this.triggerDownload(canvas);
    }
    
    printCard() {
        this.showMessage('Preparing print...', 'loading');
        
        // Create a print-friendly version
        const printWindow = window.open('', '_blank');
        const cardElement = this.cardPreview.cloneNode(true);
        
        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print MTG Card - ${this.cardNameInput.value}</title>
            <style>
                body { 
                    margin: 0; 
                    padding: 20px; 
                    background: white; 
                    font-family: Arial, sans-serif;
                }
                .print-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 80vh;
                }
                .card-container {
                    width: 300px;
                    height: 420px;
                    transform: scale(1.2);
                    margin: 20px;
                }
                @media print {
                    body { margin: 0; padding: 0; }
                    .print-container { 
                        min-height: 100vh; 
                        page-break-inside: avoid; 
                    }
                }
                .card-background { 
                    width: 100%; 
                    height: 100%; 
                    background: #2b1810; 
                    border-radius: 12px; 
                    border: 3px solid #8B4513; 
                    position: relative;
                    overflow: hidden;
                }
                .card-frame {
                    width: 100%;
                    height: 100%;
                    padding: 8px;
                    box-sizing: border-box;
                }
                .frame-header {
                    background: rgba(255,255,255,0.9);
                    padding: 8px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }
                .name {
                    font-size: 16px;
                    font-weight: bold;
                    color: black;
                    margin: 0;
                }
                .frame-art {
                    width: 100%;
                    height: 140px;
                    object-fit: cover;
                    border-radius: 8px;
                    margin-bottom: 8px;
                }
                .frame-type-line {
                    background: rgba(255,255,255,0.9);
                    padding: 6px;
                    border-radius: 6px;
                    margin-bottom: 8px;
                }
                .type {
                    font-size: 14px;
                    font-weight: bold;
                    color: black;
                    margin: 0;
                }
                .frame-text-box {
                    background: rgba(255,255,255,0.95);
                    padding: 8px;
                    border-radius: 8px;
                    margin-bottom: 8px;
                    flex-grow: 1;
                }
                .description {
                    font-size: 12px;
                    color: black;
                    margin: 0 0 8px 0;
                    line-height: 1.4;
                }
                .flavour-text {
                    font-size: 11px;
                    font-style: italic;
                    color: #333;
                    margin: 0;
                }
                .frame-bottom-info {
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 10px;
                    display: flex;
                    justify-content: space-between;
                }
                .ms { 
                    width: 20px; 
                    height: 20px; 
                    border-radius: 50%; 
                    display: inline-block; 
                    text-align: center; 
                    line-height: 20px; 
                    color: white; 
                    font-weight: bold; 
                    font-size: 12px; 
                }
                .ms-g { background: #ADD3AC; color: black; }
                .ms-w { background: #FFFBD5; color: black; }
                .ms-u { background: #0E68AB; }
                .ms-b { background: #150B00; }
                .ms-r { background: #D3202A; }
                .ms-c { background: #CCCCCC; color: black; }
            </style>
        </head>
        <body>
            <div class="print-container">
                <div class="card-container">
                    <div class="card-background">
                        <div class="card-frame">
                            <div class="frame-header">
                                <h1 class="name">${this.cardNameInput.value}</h1>
                                <i class="ms ${this.manaCostSelect.value}"></i>
                            </div>
                            <img class="frame-art" src="${this.cardArt.src}" alt="card art">
                            <div class="frame-type-line">
                                <h1 class="type">${this.cardTypeInput.value}</h1>
                            </div>
                            <div class="frame-text-box">
                                <p class="description">${this.cardTextArea.value}</p>
                                <p class="flavour-text">${this.flavorTextArea.value}</p>
                            </div>
                            <div class="frame-bottom-info">
                                <div>${this.collectorNumberInput.value}</div>
                                <div>${this.copyrightTextInput.value}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                setTimeout(() => {
                    window.print();
                }, 1000);
            </script>
        </body>
        </html>
        `);
        
        printWindow.document.close();
        this.showSuccessMessage('Print dialog opened!');
    }

    downloadCardAlternative() {
        // Alternative method using canvas directly
        this.showMessage('Using alternative download method...', 'loading');
        
        try {
            // Create a high-resolution canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions (higher resolution)
            const scale = 2; // Reduced scale for better performance
            const cardRect = this.cardPreview.getBoundingClientRect();
            canvas.width = cardRect.width * scale;
            canvas.height = cardRect.height * scale;
            
            // Scale the context for high resolution
            ctx.scale(scale, scale);
            
            // Draw the card manually
            this.drawCardToCanvas(ctx, cardRect.width, cardRect.height).then(() => {
                // Create download link
                const cardName = this.cardNameInput.value || 'mtg_card';
                const link = document.createElement('a');
                link.download = `${cardName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_card.png`;
                link.href = canvas.toDataURL('image/png', 0.9); // Slightly compressed for smaller file size
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                this.showSuccessMessage('Card downloaded successfully!');
            }).catch(error => {
                console.error('Alternative download failed:', error);
                this.downloadCardFallback();
            });
            
        } catch (error) {
            console.error('Canvas download failed:', error);
            this.downloadCardFallback();
        }
    }

    async drawCardToCanvas(ctx, width, height) {
        return new Promise((resolve, reject) => {
            try {
                // Set background
                ctx.fillStyle = '#171314';
                ctx.fillRect(0, 0, width, height);
                
                // Load and draw the card art image
                const cardArtImg = new Image();
                cardArtImg.crossOrigin = 'anonymous';
                
                cardArtImg.onload = () => {
                    try {
                        console.log('Image loaded for canvas drawing:', cardArtImg.width, 'x', cardArtImg.height);
                        // Calculate art position and size based on the actual card layout
                        const artX = width * 0.023; // Approximate position
                        const artY = height * 0.22;
                        const artWidth = width * 0.954;
                        const artHeight = height * 0.4;
                        
                        // Draw the card art (object-fit: cover simulation)
                        const imgAspect = cardArtImg.width / cardArtImg.height;
                        const frameAspect = artWidth / artHeight;
                        
                        let drawWidth, drawHeight, drawX, drawY;
                        
                        if (imgAspect > frameAspect) {
                            // Image is wider than frame - fit to height and crop width
                            drawHeight = artHeight;
                            drawWidth = drawHeight * imgAspect;
                            drawX = artX - (drawWidth - artWidth) / 2;
                            drawY = artY;
                        } else {
                            // Image is taller than frame - fit to width and crop height
                            drawWidth = artWidth;
                            drawHeight = drawWidth / imgAspect;
                            drawX = artX;
                            drawY = artY - (drawHeight - artHeight) / 2;
                        }
                        
                        // Create clipping region for the art area
                        ctx.save();
                        ctx.beginPath();
                        ctx.rect(artX, artY, artWidth, artHeight);
                        ctx.clip();
                        
                        // Draw the image with object-fit: cover behavior
                        ctx.drawImage(cardArtImg, drawX, drawY, drawWidth, drawHeight);
                        
                        // Restore the context state
                        ctx.restore();
                        
                        // Add text overlays (simplified)
                        ctx.fillStyle = 'white';
                        ctx.font = `${width * 0.04}px Arial`;
                        ctx.textAlign = 'left';
                        
                        // Card name
                        ctx.fillText(this.cardNameInput.value, width * 0.05, height * 0.15);
                        
                        // Card type
                        ctx.fillText(this.cardTypeInput.value, width * 0.05, height * 0.68);
                        
                        // Card text (simplified)
                        ctx.font = `${width * 0.025}px Arial`;
                        const cardText = this.cardTextArea.value;
                        const lines = this.wrapText(ctx, cardText, width * 0.9);
                        lines.forEach((line, index) => {
                            ctx.fillText(line, width * 0.05, height * 0.75 + (index * width * 0.03));
                        });
                        
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                };
                
                cardArtImg.onerror = () => {
                    // If image fails to load, continue without it
                    console.warn('Card art failed to load for canvas drawing');
                    resolve();
                };
                
                // Add timeout in case image takes too long to load
                setTimeout(() => {
                    if (!cardArtImg.complete) {
                        console.warn('Image loading timeout, proceeding without image');
                        resolve();
                    }
                }, 5000);
                
                                 // Set the image source (prioritize uploaded image data)
                if (this.uploadedImageData) {
                    console.log('Using uploaded image data for download');
                    cardArtImg.src = this.uploadedImageData.dataUrl;
                } else {
                    const artSrc = this.cardArt.src;
                    console.log('Using image URL for download:', artSrc);
                    if (artSrc && artSrc !== 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Card+Art') {
                        cardArtImg.src = artSrc;
                    } else {
                        console.log('No valid image source found');
                        resolve(); // No image to load
                    }
                }
                
            } catch (error) {
                reject(error);
            }
        });
    }

    wrapText(ctx, text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    loadHtml2CanvasAndDownload() {
        this.showMessage('Loading download library...', 'loading');
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = () => {
            setTimeout(() => this.downloadCard(), 500); // Small delay to ensure library is ready
        };
        script.onerror = () => {
            this.showErrorMessage('Failed to load download library. Using fallback method.');
            this.downloadCardFallback();
        };
        document.head.appendChild(script);
    }

    downloadCardFallback() {
        // Create a simple canvas-based download
        this.showMessage('Creating basic download...', 'loading');
        
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions to match card
            const cardRect = this.cardPreview.getBoundingClientRect();
            canvas.width = 400;
            canvas.height = 560;
            
            // Create a basic card background
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add card border
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 3;
            ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
            
            // Add card name
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(this.cardNameInput.value || 'Magic Card', 20, 40);
            
            // Add card type
            ctx.font = '16px Arial';
            ctx.fillText(this.cardTypeInput.value || 'Creature', 20, 350);
            
            // Add card text (simplified)
            ctx.font = '14px Arial';
            const cardText = this.cardTextArea.value || 'Card text would appear here';
            const words = cardText.split(' ');
            let line = '';
            let y = 380;
            
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > 350 && n > 0) {
                    ctx.fillText(line, 20, y);
                    line = words[n] + ' ';
                    y += 20;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, 20, y);
            
            // Add note about image
            ctx.font = '12px Arial';
            ctx.fillStyle = '#cccccc';
            ctx.fillText('(Artwork not included in fallback mode)', 20, 300);
            
            // Create download link
            const link = document.createElement('a');
            link.download = `${this.cardNameInput.value.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_mtg_card_fallback.png`;
            link.href = canvas.toDataURL('image/png');
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showSuccessMessage('Fallback card downloaded! (Artwork not included)');
            
        } catch (error) {
            console.error('Fallback download failed:', error);
            this.showErrorMessage('All download methods failed. Please try again.');
        }
    }

    getCardCSS() {
        // Return the essential CSS for the card
        const stylesheets = Array.from(document.styleSheets);
        let css = '';
        
        try {
            stylesheets.forEach(sheet => {
                if (sheet.cssRules) {
                    Array.from(sheet.cssRules).forEach(rule => {
                        if (rule.selectorText && (
                            rule.selectorText.includes('.card-') ||
                            rule.selectorText.includes('.frame-') ||
                            rule.selectorText.includes('.name') ||
                            rule.selectorText.includes('.type') ||
                            rule.selectorText.includes('#mana-icon') ||
                            rule.selectorText.includes('#set-icon') ||
                            rule.selectorText.includes('.ms')
                        )) {
                            css += rule.cssText + '\n';
                        }
                    });
                }
            });
        } catch (e) {
            console.warn('Could not access stylesheet rules:', e);
        }
        
        return css;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        let backgroundColor;
        switch(type) {
            case 'success':
                backgroundColor = '#4CAF50';
                break;
            case 'error':
                backgroundColor = '#f44336';
                break;
            case 'loading':
                backgroundColor = '#2196F3';
                break;
            default:
                backgroundColor = '#666';
        }
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${backgroundColor};
        `;
        
        // Add animation styles
        if (!document.querySelector('#messageStyles')) {
            const style = document.createElement('style');
            style.id = 'messageStyles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(messageDiv);
        
        // Auto remove after different times based on type
        const removeDelay = type === 'loading' ? 10000 : 3000; // Loading messages stay longer
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 300);
            }
        }, removeDelay);
    }

    // File Upload Methods
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.processImageFile(file);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.artUploadSection.classList.add('drag-over');
    }

    handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.artUploadSection.classList.remove('drag-over');
    }

    handleFileDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.artUploadSection.classList.remove('drag-over');
        
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                this.processImageFile(file);
            } else {
                this.showUploadStatus('Please select an image file', 'error');
            }
        }
    }

    processImageFile(file) {
        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            this.showUploadStatus('File size too large. Please select an image under 10MB.', 'error');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showUploadStatus('Please select a valid image file.', 'error');
            return;
        }

        this.showUploadStatus('Processing image...', 'loading');

        // Create FileReader to convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            
            // Create an image to validate it loads properly
            const img = new Image();
            img.onload = () => {
                // Store the image data for reliable downloading
                this.uploadedImageData = {
                    dataUrl: imageDataUrl,
                    file: file,
                    width: img.width,
                    height: img.height
                };
                
                // Clear the URL input and set the uploaded image
                this.cardArtInput.value = '';
                this.cardArt.src = imageDataUrl;
                this.showFilePreview(file);
                this.showUploadStatus('Image uploaded successfully!', 'success');
                
                // Clear status after 3 seconds
                setTimeout(() => {
                    this.showUploadStatus('', '');
                }, 3000);
            };
            
            img.onerror = () => {
                this.showUploadStatus('Invalid image file. Please try another.', 'error');
            };
            
            img.src = imageDataUrl;
        };
        
        reader.onerror = () => {
            this.showUploadStatus('Failed to read file. Please try again.', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    showFilePreview(file) {
        // Remove existing preview
        const existingPreview = this.artUploadSection.querySelector('.file-preview');
        if (existingPreview) {
            existingPreview.remove();
        }

        // Create file preview
        const preview = document.createElement('div');
        preview.className = 'file-preview';
        preview.innerHTML = `
            <span class="file-name">${file.name}</span>
            <span class="file-size">${this.formatFileSize(file.size)}</span>
            <button type="button" class="remove-file" title="Remove file">×</button>
        `;

        // Add remove functionality
        const removeBtn = preview.querySelector('.remove-file');
        removeBtn.addEventListener('click', () => {
            this.removeUploadedFile();
        });

        this.artUploadSection.appendChild(preview);
    }

    removeUploadedFile() {
        // Remove file preview
        const preview = this.artUploadSection.querySelector('.file-preview');
        if (preview) {
            preview.remove();
        }

        // Reset file input and uploaded image data
        this.cardArtFileInput.value = '';
        this.uploadedImageData = null;
        
        // Reset to URL input or placeholder
        if (this.cardArtInput.value.trim()) {
            this.updateCardArt();
        } else {
            this.cardArt.src = 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Card+Art';
        }

        this.showUploadStatus('File removed', 'success');
        setTimeout(() => {
            this.showUploadStatus('', '');
        }, 2000);
    }

    showUploadStatus(message, type) {
        this.uploadStatus.textContent = message;
        this.uploadStatus.className = `upload-status ${type}`;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    debugDownload() {
        // Simple debug download function (double-click download button to test)
        console.log('Debug download started...');
        this.showMessage('Debug download starting...', 'loading');
        
        // Test 1: Check if elements exist
        console.log('Card preview exists:', !!this.cardPreview);
        console.log('Download button exists:', !!this.downloadBtn);
        console.log('html2canvas available:', typeof html2canvas !== 'undefined');
        
        // Test 2: Try a simple canvas download
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 300;
            canvas.height = 400;
            
            // Simple test drawing
            ctx.fillStyle = '#2196F3';
            ctx.fillRect(0, 0, 300, 400);
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText('Test Download', 50, 200);
            
            // Download test image
            const link = document.createElement('a');
            link.download = 'test_download.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showSuccessMessage('Debug download completed! Check for test_download.png');
        } catch (error) {
            console.error('Debug download failed:', error);
            this.showErrorMessage('Debug download failed: ' + error.message);
        }
    }


}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MTGCardGenerator();
}); 