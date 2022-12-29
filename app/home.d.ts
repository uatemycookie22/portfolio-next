interface HomeContent {

    intro: {
        primary: string
        secondary: string
    }

    about: {
        text: [string, string, string]
    }

    education: {
        school: string
        college: string
        major: string
        graduation: string
        location: string
    }
}

interface Contact {
    phone: string
    email: string
}