import PropTypes from "prop-types";

/* Small stat block */
const Stat = ({ label, value, dark }) => (
  <div className={`rounded-md p-3 text-center border ${dark ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-100"}`}>
    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
    <p className="text-sm font-bold font-mono">{value}</p>
  </div>
);

//defining proptypes
Stat.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default Stat;
