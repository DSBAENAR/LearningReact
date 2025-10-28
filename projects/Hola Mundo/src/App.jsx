import './App.css'
export function App() {
    return(
        <article className='tw-followcard'>
            <header className='tw-followcard-header'>
                <img className='tw-followcard-avatar'
                src="https://unavatar.io/Facebook" alt="" />
                <div className='tw-followcard-info'>
                    <strong>Meta</strong>
                    <span className='tw-followcard-info-username'>@Meta</span>
                </div>
            </header>
            <aside>
                <button className='tw-followcard-btn-follow'>
                    Seguir
                </button>
            </aside>
        </article>
    )
}