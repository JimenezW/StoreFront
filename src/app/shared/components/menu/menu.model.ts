// menu.model.ts
export interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  typeAccion: 'link' | 'accion' | 'component' | 'menu' | 'NA'
  children?: MenuItem[];
}
