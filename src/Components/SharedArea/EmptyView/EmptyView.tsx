import "./EmptyView.css";

interface EmptyViewProps {
    msg: string;
}
function EmptyView(props: EmptyViewProps): JSX.Element {
    return (
        <div className="EmptyView">
			<h1>{props.msg}</h1>
            <img 
            src="https://media.giphy.com/media/j2pOFyuTJqWj9S5qdE/giphy.gif?cid=ecf05e4761384zcl1ysluo0fmrx6zrzzj901bg7bve94mzfp&rid=giphy.gif&ct=g" 
            alt="empty view" 
            />
        </div>
    );
}

export default EmptyView;
