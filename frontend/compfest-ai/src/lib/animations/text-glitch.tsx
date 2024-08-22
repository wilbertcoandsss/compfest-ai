const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 
export async function textGlitch({
    text,
    duration = 25,
    glitch = 3,
    hidden = false,
    callbackFn
}: {
    text: string;
    duration?: number;
    glitch: number;
    hidden?: boolean;
    callbackFn: (text: string) => any;
}) {
    const size = text.length;
    const initial = text
    let memoizedText: string[] = []
    if(!hidden){
        memoizedText = [...initial];
    }
    const initialPassDuration = duration / 2;

    let y = 1;
    const initialPass = setInterval(() => {
        if(!hidden){
            if (y >= size) {
                clearInterval(initialPass);
                return
            }
            const randomCharacter = alphabets.toLowerCase()[Math.floor(Math.random() * alphabets.length)];
            memoizedText[y] = randomCharacter;
            callbackFn(memoizedText.join(''));
        }
        y++;
    }, initialPassDuration);
    
    let i = hidden ? 0 : 1;
    let j = 0;

    const secondPass = setInterval(() => {
        if (i >= size) {
            clearInterval(secondPass);
            return;
        }

        if (y > i) {
            const randomCharacter = alphabets.toLowerCase()[Math.floor(Math.random() * alphabets.length)];
        memoizedText[i] = (j === glitch - 1) ? initial[i] : randomCharacter;
            callbackFn(memoizedText.join(''));

            j++;
            if (j >= glitch) {
                j = 0;
                i++;
            }
        }
    }, duration);
}