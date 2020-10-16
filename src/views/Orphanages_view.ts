import Orphanage from '../models/Orphanages'
import ImagesViews from './Images_view'

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      intructions: orphanage.intructions,
      opeing_hours: orphanage.opeing_hours,
      open_on_weekend: orphanage.open_on_weekend,
      images: ImagesViews.renderMany(orphanage.images)
    }
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage))
  }
}
