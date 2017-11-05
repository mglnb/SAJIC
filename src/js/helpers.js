export const scrollIt = (element) => {
    window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': element.offsetTop
    });
};
export const delay = (t) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}