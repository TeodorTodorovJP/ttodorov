export default {
    playListTitle: value => (typeof value === 'string' && value.length > 3 && value.length < 50),
    tags: value => {
        if (!Array.isArray(value)) return false;
        const allStrings = value.map(tag => {
            if(typeof tag === 'string' && tag.length > 3 && tag.length < 15) return true
                return false;
        }).includes(false)

        if (allStrings) return false;
        return true;
    }
}
