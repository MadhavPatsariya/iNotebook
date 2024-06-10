import React, {useState, useEffect} from 'react'

export default function Alert(props) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 1000); // 1000 milliseconds = 1 second
        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    if (!visible) {
        return null;
    }
    return (
        <div>
            <div className={`alert alert-${props.type}`} role="alert" style={props.style}>
                {props.description}
            </div>
        </div>
    )
}
