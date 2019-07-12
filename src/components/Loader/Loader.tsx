import * as React from 'react';
import './loader.scss';

export default function Loader() {
    return (
        <div className={"loader-layer"}>
            <div className="loader" id="loader-1" />
        </div>
    );
}