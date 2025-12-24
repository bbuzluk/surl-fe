import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useForm } from '../hooks/useForm';
import { shortUrlService } from '../services/shortUrlService';
import { type IShortUrl } from '../types/shorturl';
import ShortUrlTable from '../components/ShortUrlTable';

const DashboardPage: React.FC = () => {
    const [shortUrls, setShortUrls] = useState<IShortUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const { formData, handleChange, resetForm } = useForm({ originalUrl: '' });

    useEffect(() => {
        fetchShortUrls();
    }, []);

    const fetchShortUrls = async () => {
        try {
            const result = await shortUrlService.getAll();
            setShortUrls(result.data || []);
        } catch (error) {
            console.error("Links not loaded", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.originalUrl) return;

        setCreating(true);
        try {
            const result = await shortUrlService.create(formData.originalUrl);
            setShortUrls([result.data, ...shortUrls]);
            resetForm();
        } catch (error) {
            alert("Link could not be created.");
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this link?")) return;

        try {
            await shortUrlService.delete(id);
            setShortUrls(shortUrls.filter(link => link.id !== id));
        } catch (error) {
            alert("Delete operation failed.");
        }
    };

    return (
        <MainLayout>
            <div className="dashboard-container">

                <section className="card create-link-card">
                    <h2 className="title">Create New Short Link</h2>
                    <form onSubmit={handleCreate} className="create-link-form">
                        <input
                            type="url"
                            name="originalUrl"
                            placeholder="https://..."
                            className="input flex-grow"
                            value={formData.originalUrl}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn-primary" disabled={creating}>
                            {creating ? 'Shortening...' : 'Shorten'}
                        </button>
                    </form>
                </section>

                <section className="link-list-section">
                    <h3 className="subtitle">My Links ({shortUrls.length})</h3>

                    {loading ? (
                        <p className="text-muted">Loading...</p>
                    ) : shortUrls.length === 0 ? (
                        <div className="empty-state">
                            <p>You haven't created any short links yet.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <ShortUrlTable data={shortUrls} handleDelete={handleDelete} />
                        </div>
                    )}
                </section>

            </div>
        </MainLayout>
    );
};

export default DashboardPage;