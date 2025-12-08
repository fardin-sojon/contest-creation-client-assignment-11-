import { Link } from "react-router-dom";

const ContestCard = ({ contest }) => {
    const { _id, name, image, description, participationCount, type } = contest;
    return (
        <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <figure><img src={image} alt={name} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="badge badge-secondary">{type}</div>
                <p>{description.slice(0, 100)}...</p>
                <div className="card-actions justify-between items-center mt-4">
                    <div className="badge badge-outline">Participants: {participationCount}</div>
                    <Link to={`/contest/${_id}`} className="btn bg-blue-600 hover:bg-blue-700 text-white border-none btn-sm">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;
