import { auth, getUserWithUsername, postToJSON } from "../../lib/firebase";
import UserProfile from "../../components/UserProfile";

export async function getServerSideProps({ query }:  {query: any}) {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);
    console.log('userDoc', userDoc)

    if(!userDoc) {
        return {
            notFound: true,
        }
    }

    let user = null;

    if (userDoc) {
        user = userDoc;
    }

    return {
        props: { user },
    };
}

export default function UsernamePostsPage({ user }: {user: any}) {
    return (
        <main>
            <UserProfile user = {user}/>
        </main>
    )
}