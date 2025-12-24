import type { IShortUrl } from "../types/shorturl";
import { copyToClipboard } from "../utils/clipboard";

interface ShortUrlTableProps {
  data: IShortUrl[];
  handleDelete: (id: number) => void;
}

export default function ShortUrlTable({ data, handleDelete }: ShortUrlTableProps) {
    return <table className="custom-table">
        <thead>
            <tr>
                <th>Short Link</th>
                <th>Original URL</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map((link) => (
                <tr key={link.id}>
                    <td>
                        <a href={link.fullShortUrl} target="_blank" rel="noreferrer" className="short-link">
                            {link.fullShortUrl}
                        </a>
                    </td>
                    <td>
                        <div className="original-url-truncate" title={link.originalUrl}>
                            {link.originalUrl}
                        </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                        <button
                            onClick={() => copyToClipboard(link.fullShortUrl)}
                            className="btn-secondary btn-sm"
                            style={{ marginRight: '8px' }}
                        >
                            Copy
                        </button>
                        <button
                            onClick={() => handleDelete(link.id)}
                            className="btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>;
}