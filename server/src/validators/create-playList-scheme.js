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
    },
    genres: value => {
        if ( !((typeof value) === 'object' && !Array.isArray(value)) ) return false;
        const percentages = Object.values(value).reduce((acc, perc) => {
            acc = +acc + +perc;
            return acc
        }, 0);
        if(isNaN(percentages) || percentages > 100) return false 
        return true;
    },
    combinedGenresSongsDuration: value => {
        if (isNaN(value) || +value < 1) return false;
        return true;
    },
    combinedGenresSongs: value => {
        if (!Array.isArray(value)) return false;
        if (value.length < 1) return false;
        const testObjs = value.map(obj => {
            if ( !((typeof obj) === 'object' && !Array.isArray(obj)) ) return false;
            return true;
        }).includes(false);
        if(testObjs) return false;

        return true;
    }
}
