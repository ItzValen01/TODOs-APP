import '../styles/TodoCounter.css';
import PropTypes from 'prop-types';
import { SettingsButton } from './SettingsButton';

export function TodoCounter({ total, completed, setOpenSettings, openSettings }) {
  return (
    <div className="header">
      <div className="head">
        <h1>
          Your Tasks
        </h1>

        <SettingsButton setOpenSettings={setOpenSettings} openSettings={openSettings} />
      </div>

      <p className="completed">Completed {completed} to {total}</p>
    </div>
  );
}

TodoCounter.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
};