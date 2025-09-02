import cssText from './../styles.css?inline';


export function useInjectStyle() {
    const styleId = '__vue3-form-inputs-style__';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = cssText;
        document.head.appendChild(style);
    }
}