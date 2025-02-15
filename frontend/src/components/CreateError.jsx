import PropTypes from "prop-types";
import { ErrorIcon } from "./Icons";
import '../styles/CreateError.css';

CreateError.propTypes = {
    error: PropTypes.string.isRequired,
};

export function CreateError({ error }) {

    const status = (error != "" && error != null) ? 'show-error' : '';

    return (
        <div className={`error-container ` + status}>
            <ErrorIcon />
            <p className="error-text">
                {error}
            </p>
        </div>
    );
}