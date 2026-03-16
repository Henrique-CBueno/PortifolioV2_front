import { useState } from "react";
import type { ReactNode } from "react";

interface DraggableItemState {
    isDragging: boolean;
    isDragOver: boolean;
    isSettled: boolean;
}

interface DraggableReorderListProps<T> {
    items: T[];
    getKey: (item: T, index: number) => string;
    onReorder: (fromIndex: number, toIndex: number) => void;
    containerClassName?: string;
    itemClassName?: (state: DraggableItemState) => string;
    handleClassName?: string;
    handleTitle?: string;
    settleDurationMs?: number;
    renderContent: (item: T, index: number) => ReactNode;
}

export default function DraggableReorderList<T>({
    items,
    getKey,
    onReorder,
    containerClassName = "",
    itemClassName,
    handleClassName = "cursor-grab select-none px-1 text-white/40 hover:text-white/70 active:cursor-grabbing",
    handleTitle = "Arraste para reordenar",
    settleDurationMs = 220,
    renderContent,
}: DraggableReorderListProps<T>) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [settledIndex, setSettledIndex] = useState<number | null>(null);

    return (
        <div className={containerClassName}>
            {items.map((item, index) => {
                const state: DraggableItemState = {
                    isDragging: draggedIndex === index,
                    isDragOver: dragOverIndex === index,
                    isSettled: settledIndex === index,
                };

                return (
                    <div
                        key={getKey(item, index)}
                        className={itemClassName ? itemClassName(state) : ""}
                        onDragOver={(e) => {
                            e.preventDefault();
                            if (dragOverIndex !== index) {
                                setDragOverIndex(index);
                            }
                        }}
                        onDragLeave={() => {
                            if (dragOverIndex === index) {
                                setDragOverIndex(null);
                            }
                        }}
                        onDrop={() => {
                            if (draggedIndex === null) return;
                            onReorder(draggedIndex, index);
                            setSettledIndex(index);
                            window.setTimeout(() => setSettledIndex(null), settleDurationMs);
                            setDraggedIndex(null);
                            setDragOverIndex(null);
                        }}
                    >
                        <span
                            draggable
                            onDragStart={() => setDraggedIndex(index)}
                            onDragEnd={() => {
                                setDraggedIndex(null);
                                setDragOverIndex(null);
                            }}
                            className={handleClassName}
                            title={handleTitle}
                        >
                            ::
                        </span>
                        {renderContent(item, index)}
                    </div>
                );
            })}
        </div>
    );
}
