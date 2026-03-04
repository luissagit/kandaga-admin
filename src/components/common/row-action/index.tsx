import { Button, Tooltip } from 'antd';
import { PiEyeBold, PiNotePencilBold, PiTrashBold } from 'react-icons/pi';

export interface RowActionProps {
  item?: any;

  showUpdate?(item: any): boolean;
  showDelete?(item: any): boolean;
  showDetail?(item: any): boolean;

  handleUpdate?(item: any): Promise<void>;
  handleDelete?(item: any): Promise<void>;
  handleDetail?(item: any): Promise<void>;
}

export function RowAction(props: RowActionProps): React.ReactNode {
  const item = props?.item;
  const showUpdate = props?.showUpdate;
  const showDelete = props?.showDelete;
  const showDetail = props?.showDetail;
  const handleUpdate = props?.handleUpdate;
  const handleDelete = props?.handleDelete;
  const handleDetail = props?.handleDetail;

  const isShowUpdate = showUpdate ? showUpdate(item) : true;
  const isShowDelete = showDelete ? showDelete(item) : true;
  const isShowDetail = showDetail ? showDetail(item) : true;

  async function onClickUpdate() {
    if (handleUpdate) {
      await handleUpdate(item);
    }
  }

  async function onClickDelete() {
    if (handleDelete) {
      await handleDelete(item);
    }
  }

  async function onClickDetail() {
    if (handleDetail) {
      await handleDetail(item);
    }
  }

  return (
    <div className="flex gap-2 items-center">
      {isShowDetail && (
        <Tooltip title="Detail">
          <Button
            color="lime"
            variant="outlined"
            icon={<PiEyeBold />}
            onClick={onClickDetail}
          />
        </Tooltip>
      )}
      {isShowUpdate && (
        <Tooltip title="Update">
          <Button
            color="blue"
            variant="outlined"
            icon={<PiNotePencilBold />}
            onClick={onClickUpdate}
          />
        </Tooltip>
      )}
      {isShowDelete && (
        <Tooltip title="Detele">
          <Button danger icon={<PiTrashBold />} onClick={onClickDelete} />
        </Tooltip>
      )}
    </div>
  );
}
