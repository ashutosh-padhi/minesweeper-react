import Modal from "./Modal";
export default function MineModal(props) {
    return (
        <Modal>
            <div className="w-full h-full flex justify-center items-center bg-black/25">
                <div className="bg-white h-[200px] p-5 flex flex-col items-center justify-between">
                    <div className="text-7xl">{props.title()}</div>
                    <div>{props.actions()}</div>
                </div>
            </div>
        </Modal>
    );
}
