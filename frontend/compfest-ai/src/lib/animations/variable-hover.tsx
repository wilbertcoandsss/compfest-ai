import gsap from 'gsap'

export function variableFontHover({
    select,
    animationDuration = 0.5,
    maxDistance = 300,
    minFontWeight = 500,
    maxFontWeight = 900
}:{
    select:string,
    animationDuration?: number,
    maxDistance?: number,
    minFontWeight?: number,
    maxFontWeight?: number,
}){
    let mm = gsap.matchMedia();
    
    mm.add("(min-width:992px)", () => {
        const fontWeightItems = document.querySelectorAll(select);
        
        fontWeightItems.forEach(item => {
            const text = item.textContent;
            item.textContent = '';
            text?.split('').forEach(char => {
                const span = document.createElement('span');
                span.classList.add('char');
                span.dataset.animate = 'font-weight';
                span.textContent = char;
                item.appendChild(span);
            });
        });

        document.addEventListener("mousemove", (e) => {
            const mouseX = e.pageX;
            const mouseY = e.pageY;

            fontWeightItems.forEach(item => {
                item.querySelectorAll(".char").forEach(char => {
                    const itemRect = char.getBoundingClientRect();
                    const itemCenterX = itemRect.left + itemRect.width / 2 + window.scrollX;
                    const itemCenterY = itemRect.top + itemRect.height / 2 + window.scrollY;

                    const distance = Math.sqrt(
                        Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2)
                    );

                    let fontWeight = 
                        distance < maxDistance ? gsap.utils.mapRange(
                            0, 
                            maxDistance,
                            minFontWeight,
                            maxFontWeight,
                            Math.max(0, maxDistance - distance)
                        ) : minFontWeight;

                    gsap.to(char, {fontWeight, duration: animationDuration});
                });
            });
        });
    });
}