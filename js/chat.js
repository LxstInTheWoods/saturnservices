T1input = document.getElementById("message")
function adjustTextareaHeight() {
    T1input.style.height = 'auto';
    T1input.style.height = T1input.scrollHeight + 'px';

    if (T1input.scrollHeight > parseInt(getComputedStyle(T1input).maxHeight)) {
        T1input.style.overflowY = "scroll;";
    } else {
        T1input.style.overflowY = "auto";
    }
}
T1input.addEventListener('input', adjustTextareaHeight);
T1input.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        const start = T1input.selectionStart;
        const end = T1input.selectionEnd;
        const value = T1input.value;
        T1input.value = value.substring(0, start) + '\n' + value.substring(end);
        T1input.selectionStart = T1input.selectionEnd = start + 1;
        T1input.scrollTop = T1input.scrollHeight;

    }
});
adjustTextareaHeight()