export function TwitterFollowCard({username,name,isFollowing}){
    return(
        <article className='tw-followcard'>
            <header className='tw-followcard-header'>
                <img className='tw-followcard-avatar'
                src={`https://unavatar.io/${username}`} alt="" />
                <div className='tw-followcard-info'>
                    <strong>{`@${name}`}</strong>
                    <span className='tw-followcard-info-username'>{username}</span>
                </div>
            </header>
            <aside>
                <button className='tw-followcard-btn-follow'>
                    Follow
                </button>
            </aside>
        </article>
    )
}