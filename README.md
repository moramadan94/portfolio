# Mohamed Ramadan - VS Code Portfolio

A professional portfolio website designed with a VS Code interface aesthetic, showcasing Mohamed Ramadan's frontend development experience and skills.

## 🚀 Features

- **VS Code Interface**: Authentic VS Code dark theme with file explorer and tabbed navigation
- **Interactive File System**: Click on files in the sidebar to open tabs
- **Tab Management**: Open multiple tabs, switch between them, and close tabs with × button
- **Keyboard Shortcuts**: Navigate quickly using Ctrl/Cmd + 1-6 keys
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional Content**: Complete portfolio showcasing 7+ years of frontend development experience
- **Contact Integration**: Functional contact cards with copy-to-clipboard and direct action buttons

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Interactive functionality without frameworks
- **Font Awesome**: Professional iconography
- **Responsive Design**: Mobile-first approach with multiple breakpoints

## 📁 Project Structure

```
mohamed-ramadan-portfolio/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS styling
├── script.js              # Interactive functionality
├── README.md              # Project documentation
└── Mohamed_Ramadan.pdf    # Original CV/Resume
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#1e1e1e` (VS Code dark background)
- **Secondary Background**: `#252526` (Sidebar background)
- **Tertiary Background**: `#2d2d30` (Tab bar background)
- **Accent Blue**: `#007acc` (VS Code blue accent)
- **Text Primary**: `#cccccc` (Main text color)
- **Borders**: `#3e3e42` (Subtle borders)

### Typography
- **Font Family**: Consolas, Monaco, Courier New (Monospace)
- **Responsive sizing**: Scales appropriately across devices

## 🖥️ Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full sidebar + content)
- **Laptop**: 992px-1199px (Smaller sidebar)
- **Tablet**: 768px-991px (Horizontal navigation)
- **Mobile**: 576px-767px (Stacked layout)
- **Small Mobile**: <576px (Compact design)

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + 1`: Open About tab
- `Ctrl/Cmd + 2`: Open Experience tab
- `Ctrl/Cmd + 3`: Open Skills tab
- `Ctrl/Cmd + 4`: Open Projects tab
- `Ctrl/Cmd + 5`: Open Education tab
- `Ctrl/Cmd + 6`: Open Contact tab
- `Ctrl/Cmd + W`: Close current tab

## 🚀 Deployment Instructions

### GitHub Pages

1. **Upload files to GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

3. **Access your site**: `https://yourusername.github.io/portfolio`

### Cloudflare Pages

1. **Connect to Git repository**:
   - Log into Cloudflare dashboard
   - Go to Pages section
   - Click "Create a project"
   - Connect your GitHub repository

2. **Configure build settings**:
   - Build command: (leave empty for static site)
   - Build output directory: (leave empty)
   - Environment variables: (none needed)

3. **Deploy**: Cloudflare will automatically deploy on every push

### Netlify

1. **Drag and drop deployment**:
   - Go to https://netlify.com
   - Drag the project folder to the deploy area
   - Site will be live immediately

2. **Git integration** (optional):
   - Connect GitHub repository
   - Enable automatic deployments

### Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow prompts** for configuration

### Custom Domain Setup

For any hosting platform:

1. **Add custom domain** in hosting settings
2. **Update DNS records**:
   - Add CNAME record pointing to hosting platform
   - Or A record for direct IP (varies by platform)
3. **Enable HTTPS** (usually automatic)

## 🔧 Customization

### Updating Content

1. **Personal Information**: Edit contact details in `index.html`
2. **Experience**: Update work history in the experience section
3. **Skills**: Modify skill categories and technologies
4. **Projects**: Add or update project descriptions
5. **Colors**: Modify CSS custom properties in `:root` selector

### Adding New Sections

1. Add new file item in sidebar HTML
2. Create corresponding tab content section
3. Update JavaScript `tabConfig` object
4. Add CSS styling for new section

### Profile Image

To add a profile image:
1. Save image as `image.jpg` in project root
2. Replace the icon in `.profile-image` with:
   ```html
   <img src="image.jpg" alt="Mohamed Ramadan" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
   ```

## 🌟 Performance Features

- **Lightweight**: No external frameworks or heavy dependencies
- **Fast Loading**: Optimized CSS and JavaScript
- **Smooth Animations**: CSS transitions for enhanced UX
- **Accessibility**: Semantic HTML and keyboard navigation support
- **SEO Friendly**: Proper meta tags and semantic structure

## 📞 Contact Information

**Mohamed Ramadan**
- Email: mo.ramadan.be4em@gmail.com
- Phone (Saudi Arabia): +966 53 413 0024
- Phone (Egypt): +201120408191
- LinkedIn: @MohamedRamadan
- GitHub: @MoRamadan
- Location: Riyadh, Saudi Arabia

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

---

**Built with ❤️ by Mohamed Ramadan**
*Senior Frontend Developer with 7+ years of experience*