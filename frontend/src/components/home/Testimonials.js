const Testimonials = () => {
    return (
        <div className="my-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Lo que dicen nuestros usuarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded shadow">
                    <p className="italic">"Una excelente plataforma, me ayudó a organizar mis clases fácilmente."</p>
                    <p className="mt-2 font-semibold text-right">- Profesor Juan</p>
                </div>
                <div className="p-4 border rounded shadow">
                    <p className="italic">"Pude aprender a mi ritmo y reforzar mis conocimientos."</p>
                    <p className="mt-2 font-semibold text-right">- Estudiante Ana</p>
                </div>
                <div className="p-4 border rounded shadow">
                    <p className="italic">"La interfaz es muy simple y las clases están bien estructuradas."</p>
                    <p className="mt-2 font-semibold text-right">- Estudiante Carlos</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
