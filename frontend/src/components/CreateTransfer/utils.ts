export const getOwnerIdsOptions = (ownerId: number[] | undefined) => {
  if (!ownerId) {
    return []
  }

  return ownerId.map(ownerId => ({
    value: ownerId.toString(),
    label: ownerId.toString()
  }))
}
