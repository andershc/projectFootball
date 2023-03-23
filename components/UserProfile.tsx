export default function UserProfile({user}: {user:any}) {
    return(
        <div>
            <img src={user.photoURL} className="card-img-center"/>
            <div>
                <i>@{user.username}</i>
            </div>
            <div>
                <h1>{user.displayName}</h1>
            </div>
        </div>
    );
}