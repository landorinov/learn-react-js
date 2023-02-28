export default function Default({ children }) {
    return (
        <>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                {children}
            </div>
        </>
    )
}