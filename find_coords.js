const fs = require('fs');

const svg = fs.readFileSync('./public/world.svg', 'utf8');

// A very naive parser to extract the `d` attribute of specific countries.
const parsePaths = (countryName) => {
    const rx = new RegExp(`name="${countryName}".*?d="([^"]+)"`, "i");
    const classRx = new RegExp(`class="${countryName}".*?d="([^"]+)"`, "g");
    
    let paths = [];
    
    // Check id/name first
    let match = rx.exec(svg);
    if (!match) {
        // try looking for name before d or after d
        const altRx = new RegExp(`d="([^"]+)".*?name="${countryName}"`, "i");
        match = altRx.exec(svg);
    }
    
    if (match) {
        paths.push(match[1]);
    }
    
    // Also check class matches
    let classMatch;
    while ((classMatch = classRx.exec(svg)) !== null) {
        paths.push(classMatch[1]);
    }
    
    return paths;
};

const getCenter = (pathStr) => {
    const numbers = pathStr.match(/[\d\.]+/g);
    if (!numbers || numbers.length === 0) return null;
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < numbers.length - 1; i += 2) {
        const x = parseFloat(numbers[i]);
        const y = parseFloat(numbers[i+1]);
        
        if (x < 10 || x > 1990 || y < 10 || y > 840) continue; // Filter out bad points/commands
        
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }
    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2, minX, maxX, minY, maxY };
};

const targetCountries = ["United States", "United Kingdom", "Germany", "United Arab Emirates", "India"];

targetCountries.forEach(country => {
    const paths = parsePaths(country);
    if (paths.length > 0) {
        console.log(`\nFound paths for ${country}`);
        // let's just grab the largest path as main body usually
        let largestS = -1;
        let mainCenter = null;
        
        paths.forEach(p => {
            const center = getCenter(p);
            if (center) {
                const area = (center.maxX - center.minX) * (center.maxY - center.minY);
                if (area > largestS) {
                    largestS = area;
                    mainCenter = center;
                }
            }
        });
        
        if (mainCenter) {
             console.log(`Main Center: X=${mainCenter.x.toFixed(2)}, Y=${mainCenter.y.toFixed(2)}`);
        }
    } else {
        console.log(`Could not find ${country}`);
    }
});
