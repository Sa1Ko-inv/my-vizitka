const fs = require('fs');

function run() {
    let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

    if (!content.includes('import { motion }')) {
        content = content.replace("import React from 'react'", "import React from 'react'\nimport { motion } from 'framer-motion'");
    }

    if (!content.includes('import DepthScroll')) {
        content = content.replace("import ScrollReveal from '../components/ScrollReveal'", "import ScrollReveal from '../components/ScrollReveal'\nimport DepthScroll from '../components/DepthScroll'");
    }

    // Replace paths with stroke
    content = content.replace(/<path([^>]+stroke=['"].*?[^>]*)>/g, (match, p1) => {
        if (p1.endsWith('/')) {
            let inner = p1.slice(0, -1);
            return `<motion.path${inner} initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} />`;
        }
        return match;
    });

    // Replace paths with fill only
    content = content.replace(/<path([^>]+fill=['"].*?[^>]*)>/g, (match, p1) => {
        if (match.startsWith('<motion.path')) return match;
        if (p1.endsWith('/')) {
            let inner = p1.slice(0, -1);
            return `<motion.path${inner} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />`;
        }
        return match;
    });

    // Replace circles
    content = content.replace(/<circle([^>]+)>/g, (match, p1) => {
        if (match.startsWith('<motion.circle')) return match;
        if (p1.endsWith('/')) {
            let inner = p1.slice(0, -1);
            return `<motion.circle${inner} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />`;
        }
        return match;
    });

    // Replace polygons
    content = content.replace(/<polygon([^>]+)>/g, (match, p1) => {
        if (match.startsWith('<motion.polygon')) return match;
        if (p1.endsWith('/')) {
            let inner = p1.slice(0, -1);
            return `<motion.polygon${inner} initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 2, delay: 0.5 }} />`;
        }
        return match;
    });

    fs.writeFileSync('src/app/page.tsx', content);
    console.log('Transformation complete!');
}

run();
