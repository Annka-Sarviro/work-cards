'use client';

import { ListWithCards } from '@/types';
import { ListHeader } from './list-header';
import { ElementRef, useRef, useState } from 'react';
import { CardForm } from './card-form';
import { cn } from '@/lib/utils';
import { CardItem } from './card-item';

interface ListItemProps {
    list: ListWithCards;
    index: number;
}

export const ListItem = ({ list, index }: ListItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef<ElementRef<'textarea'>>(null);

    const enabledEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 100);
    };

    const disabledEditing = () => {
        setIsEditing(false);
    };

    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                <ListHeader list={list} onAddCard={enabledEditing} />
                <ol
                    className={cn(
                        'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                        list.cards.length > 0 ? 'mt-2' : 'mt-6'
                    )}
                >
                    {list.cards.map((card, index) => (
                        <CardItem index={index} key={card.id} data={card} />
                    ))}
                </ol>

                <CardForm
                    listId={list.id}
                    ref={textareaRef}
                    isEditing={isEditing}
                    disabledEditing={disabledEditing}
                    enabledEditing={enabledEditing}
                />
            </div>
        </li>
    );
};
