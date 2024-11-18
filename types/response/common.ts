export interface APIResponse<T> {
	data?: T;
    success: string
}

export interface IPaginationMeta {
    current_cursor: string
    next_cursor: string
}