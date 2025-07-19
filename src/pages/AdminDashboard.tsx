import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LogOut,
  Users,
  MessageSquare,
  Image,
  FileText,
  TrendingUp,
  Calendar,
  Star,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>({});
  const [quotes, setQuotes] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.success) {
        setUser(response.data.user);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate('/login');
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load statistics
      const [quoteStats, testimonialStats, galleryStats] = await Promise.all([
        apiService.getQuoteStats(),
        apiService.getTestimonialStats(),
        apiService.getGalleryStats()
      ]);

      setStats({
        quotes: quoteStats.data,
        testimonials: testimonialStats.data,
        gallery: galleryStats.data
      });

      // Load recent data
      const [quotesData, testimonialsData, galleryData] = await Promise.all([
        apiService.getQuotes({ limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }),
        apiService.getAllTestimonials({ limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }),
        apiService.getAllGalleryItems({ limit: 10, sortBy: 'createdAt', sortOrder: 'desc' })
      ]);

      setQuotes(quotesData.data.quotes);
      setTestimonials(testimonialsData.data.testimonials);
      setGalleryItems(galleryData.data.galleryItems);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    navigate('/login');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel"
    });
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      await apiService.updateQuoteStatus(id, { status });
      loadDashboardData();
      toast({
        title: "Quote updated",
        description: `Quote status changed to ${status}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quote status",
        variant: "destructive"
      });
    }
  };

  const updateTestimonialStatus = async (id: string, status: string) => {
    try {
      await apiService.updateTestimonialStatus(id, { status });
      loadDashboardData();
      toast({
        title: "Testimonial updated",
        description: `Testimonial ${status} successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial status",
        variant: "destructive"
      });
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      await apiService.deleteGalleryItem(id);
      loadDashboardData();
      toast({
        title: "Gallery item deleted",
        description: "Gallery item has been removed successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
      contacted: 'outline',
      quoted: 'secondary',
      completed: 'default'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Quotes</p>
                  <p className="text-2xl font-bold">{stats.quotes?.totalQuotes || 0}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Testimonials</p>
                  <p className="text-2xl font-bold">{stats.testimonials?.averageRating?.totalCount || 0}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Gallery Items</p>
                  <p className="text-2xl font-bold">{stats.gallery?.totalItems || 0}</p>
                </div>
                <Image className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold">
                    {stats.testimonials?.averageRating?.avgRating?.toFixed(1) || '0.0'}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="quotes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quotes">Quote Requests</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* Quotes Tab */}
          <TabsContent value="quotes">
            <Card>
              <CardHeader>
                <CardTitle>Recent Quote Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <div key={quote._id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{quote.name}</h4>
                          <p className="text-sm text-gray-600">{quote.phone} • {quote.location}</p>
                          <p className="text-sm text-gray-600">{quote.service}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(quote.status)}
                          <span className="text-xs text-gray-500">
                            {new Date(quote.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{quote.message}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQuoteStatus(quote._id, 'contacted')}
                          disabled={quote.status === 'contacted'}
                        >
                          Mark Contacted
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQuoteStatus(quote._id, 'quoted')}
                          disabled={quote.status === 'quoted'}
                        >
                          Mark Quoted
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQuoteStatus(quote._id, 'completed')}
                          disabled={quote.status === 'completed'}
                        >
                          Mark Completed
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Testimonial Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.service}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < testimonial.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(testimonial.status)}
                          <span className="text-xs text-gray-500">
                            {new Date(testimonial.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mb-3 italic">"{testimonial.comment}"</p>
                      {testimonial.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => updateTestimonialStatus(testimonial._id, 'approved')}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => updateTestimonialStatus(testimonial._id, 'rejected')}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item._id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        {item.type === 'image' ? (
                          <img 
                            src={item.thumbnailUrl || item.url} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Image className="h-12 w-12 text-gray-400" />
                            <span className="ml-2 text-gray-500">Video</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant={item.isActive ? 'default' : 'secondary'}>
                            {item.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteGalleryItem(item._id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;