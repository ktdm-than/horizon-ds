// CardImage — Figma component set 163:56 (ratio = 1:1 | 4:3, state = idle | hover, showIconBtn)
import { IconBtn, type IconBtnProps } from '../IconBtn/IconBtn';
import './CardImage.css';

export type CardImageProps = {
  /** Figma `ratio`. The image fills its parent's width; height follows the ratio. */
  ratio?: '1:1' | '4:3';
  /** Figma `state`. hover shows the overlay gradient and lifts the IconBtn; real pointer hover applies regardless. */
  state?: 'idle' | 'hover';
  /** Figma `showIconBtn`. */
  showIconBtn?: boolean;
  /** Image URL. Without it the surfaceSecondary placeholder shows, as in Figma. */
  src?: string;
  alt?: string;
  /** Passed to the overlaid IconBtn (e.g. onClick, aria-label). */
  iconBtn?: Omit<IconBtnProps, 'state'>;
};

export function CardImage({ ratio = '1:1', state = 'idle', showIconBtn = true, src, alt = '', iconBtn }: CardImageProps) {
  return (
    <div className="hds-card-image" data-ratio={ratio} data-state={state}>
      {src && <img className="hds-card-image__media" src={src} alt={alt} />}
      <div className="hds-card-image__overlay" aria-hidden="true" />
      {showIconBtn && <IconBtn {...iconBtn} state={state} />}
    </div>
  );
}
