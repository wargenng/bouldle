export const messages = (round, score) => {
    if (score >= 12)
        switch (round) {
            case 1:
                return "you're insane!";
                break;
            case 2:
                return "wow!";
                break;
            case 3:
                return "great job!";
                break;
            case 4:
                return "solid!";
                break;
            case 5:
                return "saved it!";
                break;
            case 6:
                return "clutched it!";
                break;
        }
    else {
        switch (round) {
            case 1:
                return "you got this!";
                break;
            case 2:
                return "allez!";
                break;
            case 3:
                return "so close!";
                break;
            case 4:
                return "breathe...";
                break;
            case 5:
                return "don't give up!";
                break;
            case 6:
                return "better luck next time!";
                break;
        }
    }
};
