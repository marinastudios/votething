import { alphabet, generateRandomString } from "oslo/crypto";

const ids =  {
    session_alphabet: alphabet('a-z', 'A-Z', '0-9', '-', '_'),
    session: () => generateRandomString(20, ids.session_alphabet),
    poll_alphabet: alphabet('a-z', 'A-Z', '0-9', '_'),
    poll: () => generateRandomString(20, ids.poll_alphabet)
}

export default ids;