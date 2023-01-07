interface HomeContent {

    intro: {
        primary: string
        secondary: string
        facts: Fact[]
    }

    about: {
        text: string[]
    }

    education: {
        school: string
        college: string
        major: string
        graduation: string
        location: string
    }

    experience: {
        jobs: Job[]
    }
}

interface Contact {
    phone: string
    email: string
}

interface Job {
    front: {
        companyName: string
        companyLogo: string
        companyHref: string
        location: string
        duration: string
        position: string
        technologiesUsed?: Technology[]
    }

    back: {
        items: string[]
    }
}

interface Technology {
    src: string
    alt: string
}

interface Fact {
    heading: string
    text: string
}