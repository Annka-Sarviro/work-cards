import { deleteBoard } from '@/action/delete-board';

import { FormDeleteButton } from './form-delete-button';

interface BoardProps {
    title: string;
    id: string;
}

export const Board = ({ title, id }: BoardProps) => {
    const deleteBoardId = deleteBoard.bind(null, id);

    return (
        <form className="flex items-center gap-x-2" action={deleteBoardId}>
            <p> Board name:{title}</p>
            <FormDeleteButton />
        </form>
    );
};
