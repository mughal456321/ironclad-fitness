import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Product, DigitalProgram, CartItem, UserAccount, Order } from '../types';

interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  cart: CartItem[];
  user: UserAccount | null;
  products: Product[];
  programs: DigitalProgram[];
  activeGoalFilter: string;
  activeTypeFilter: string;
  searchQuery: string;
  isCartOpen: boolean;
  isDashboardOpen: boolean;
  isJoinModalOpen: boolean;
  setJoinModalOpen: (isOpen: boolean) => void;
  checkoutStep: 'idle' | 'billing' | 'review' | 'confirmed';
  liveCounter: number;
  loading: boolean;
  authLoading: boolean;
  error: string | null;
  lastOrderId: string | null;
  toast: ToastData | null;
  showToast: (message: string, type: ToastData['type'], duration?: number) => void;
  clearToast: () => void;
  addToCart: (item: { product?: Product; program?: DigitalProgram; selectedSize?: string; selectedWeight?: string; selectedColor?: string }, silent?: boolean) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  setGoalFilter: (goal: string) => void;
  setTypeFilter: (type: string) => void;
  setSearchQuery: (query: string) => void;
  setCartOpen: (isOpen: boolean) => void;
  setDashboardOpen: (isOpen: boolean) => void;
  setCheckoutStep: (step: 'idle' | 'billing' | 'review' | 'confirmed') => void;
  placeOrder: (shippingDetails: { name: string; street: string; city: string; zip: string; cardNum: string }) => void;
  claimDigitalBlueprint: (programId: string) => void;
  cancelOrder: (orderId: string) => void;
  returnOrder: (orderId: string) => void;
  updateUserProfile: (name: string, email: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [programs, setPrograms] = useState<DigitalProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read local storage or fallback
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('ironclad_cart');
    return local ? JSON.parse(local) : [];
  });

  const [user, setUser] = useState<UserAccount | null>(null);

  // Filters
  const [activeGoalFilter, setGoalFilter] = useState<string>('All');
  const [activeTypeFilter, setTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // UI state open
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const [isDashboardOpen, setDashboardOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'billing' | 'review' | 'confirmed'>('idle');
  const [toast, setToast] = useState<ToastData | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string, type: ToastData['type'], duration = 3000) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => setToast(null), duration);
  };

  const clearToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(null);
  };

  // Real-time active global gym session members metric tracking
  const [liveCounter, setLiveCounter] = useState<number>(1482);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  // Fetch initial data + try restore session
  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, progRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/programs')
        ]);

        if (!prodRes.ok || !progRes.ok) {
          throw new Error('SYSTEM TERMINAL FAILURE: Database unreachable.');
        }

        const productsData = await prodRes.json();
        const programsData = await progRes.json();

        setProducts(productsData);
        setPrograms(programsData);

        // Try restore session from localStorage
        const savedEmail = localStorage.getItem('ironclad_email');
        if (savedEmail) {
          const sessionRes = await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: savedEmail })
          });
          if (sessionRes.ok) {
            const userData = await sessionRes.json();
            setUser(userData);
          } else {
            localStorage.removeItem('ironclad_email');
          }
        }
      } catch (err) {
        console.error('Failed to fetch data from API:', err);
        setError('SYSTEM TERMINAL FAILURE: Database unreachable. Verify backend signal.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('ironclad_cart', JSON.stringify(cart));
  }, [cart]);

  // Live active members counter updates dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next > 1400 && next < 1600 ? next : prev;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (item: { product?: Product; program?: DigitalProgram; selectedSize?: string; selectedWeight?: string; selectedColor?: string }, silent?: boolean) => {
    setCart(prevCart => {
      // Look for identical item matching variations
      const existingIdx = prevCart.findIndex(cartItem => {
        if (item.product && cartItem.product) {
          return (
            cartItem.product.id === item.product.id &&
            cartItem.selectedSize === item.selectedSize &&
            cartItem.selectedWeight === item.selectedWeight &&
            cartItem.selectedColor === item.selectedColor
          );
        }
        if (item.program && cartItem.program) {
          return cartItem.program.id === item.program.id;
        }
        return false;
      });

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    // Open slide out cart panel immediately
    if (!silent) setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prevCart => {
      const updated = [...prevCart];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = async (shippingDetails: { name: string; street: string; city: string; zip: string; cardNum: string }) => {
    if (!user) return;

    // Math total
    const subtotal = cart.reduce((acc, item) => {
      const price = item.product ? item.product.price : (item.program ? item.program.price : 0);
      return acc + (price * item.quantity);
    }, 0);

    // Calculate details
    const earnedPoints = Math.floor(subtotal * 1.5); // 1.5 Iron Points per dollar
    const orderItems = cart.map(item => {
      if (item.product) {
        return {
          productId: item.product.id,
          name: item.product.name + (item.selectedSize ? ` (${item.selectedSize})` : '') + (item.selectedWeight ? ` - ${item.selectedWeight}` : ''),
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
          type: 'physical' as const
        };
      } else {
        return {
          name: item.program!.name,
          price: item.program!.price,
          quantity: item.quantity,
          image: item.program!.image,
          type: 'digital' as const
        };
      }
    });

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: orderItems,
      total: subtotal,
      status: orderItems.some(i => i.type === 'physical') ? 'Processing' : 'Completed',
      trackingNumber: orderItems.some(i => i.type === 'physical') ? `TRK-US-${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
      ironPointsEarned: earnedPoints
    };
    setLastOrderId(newOrder.id);

    // Any digital programs bought gets unlocked automatically
    const purchasedProgramIds = cart
      .filter(item => item.program !== undefined)
      .map(item => item.program!.id);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: newOrder,
          email: user.email,
          earnedPoints,
          purchasedProgramIds
        })
      });

      if (response.ok) {
        // Update local user state
        setUser(prevUser => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            ironPoints: prevUser.ironPoints + earnedPoints,
            orders: [newOrder, ...prevUser.orders],
            unlockedPrograms: Array.from(new Set([...prevUser.unlockedPrograms, ...purchasedProgramIds]))
          };
        });

        // Advance checkout to next
        setCheckoutStep('confirmed');
        clearCart();
      } else {
        showToast('Order authorization failed at terminal.', 'error');
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      showToast('Communication lost with logistics server.', 'error');
    }
  };

  const claimDigitalBlueprint = async (programId: string) => {
    if (!user) return;
    
    // Find the program to get its price
    const program = programs.find(p => p.id === programId);
    if (!program) return;
    const pointCost = Math.floor(program.price * 10);

    try {
      const response = await fetch('/api/user/claim-program', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          programId,
          pointCost
        })
      });

      if (response.ok) {
        setUser(prev => {
          if (!prev) return null;
          return {
            ...prev,
            ironPoints: prev.ironPoints - pointCost,
            unlockedPrograms: Array.from(new Set([...prev.unlockedPrograms, programId]))
          };
        });
        showToast(`Training blueprint unlocked. -${pointCost} points deducted.`, 'success');
      } else {
        showToast('Insufficient loyalty points for this program.', 'error');
      }
    } catch (error) {
      console.error('Failed to claim program:', error);
      showToast('Claim authorization failed.', 'error');
    }
  };

  const updateUserProfile = async (name: string, email: string) => {
    const currentEmail = user?.email;
    setUser(prev => prev ? { ...prev, name, email } : prev);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentEmail, name, email })
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Backend profile update skipped:', error);
    }
  };

  const cancelOrder = (orderId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: prev.orders.map(o =>
          o.id === orderId
            ? { ...o, status: 'Cancelled' as const, cancellationDate: new Date().toISOString().split('T')[0] }
            : o
        )
      };
    });
    showToast(`Order ${orderId} has been cancelled.`, 'success');
  };

  const returnOrder = (orderId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: prev.orders.map(o =>
          o.id === orderId
            ? { ...o, status: 'Returned' as const, returnDate: new Date().toISOString().split('T')[0], ironPointsEarned: 0 }
            : o
        )
      };
    });
    showToast(`Return initiated for order ${orderId}.`, 'success');
  };

  // ==================== AUTH METHODS ====================

  const login = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Login failed');
      }
      const userData = await res.json();
      setUser(userData);
      localStorage.setItem('ironclad_email', email);
      setJoinModalOpen(true);
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Registration failed');
      }
      const userData = await res.json();
      setUser(userData);
      localStorage.setItem('ironclad_email', email);
      setJoinModalOpen(true);
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const googleLogin = async (credential: string) => {
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Google Sign-In failed');
      }
      const userData = await res.json();
      setUser(userData);
      localStorage.setItem('ironclad_email', userData.email);
      setJoinModalOpen(true);
    } catch (err: any) {
      showToast(err.message || 'Google Sign-In failed', 'error');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ironclad_email');
    setJoinModalOpen(false);
    setDashboardOpen(false);
    setCheckoutStep('idle');
  };

  return (
    <AppContext.Provider value={{
      cart,
      user,
      products,
      programs,
      activeGoalFilter,
      activeTypeFilter,
      searchQuery,
      isCartOpen,
      isDashboardOpen,
      isJoinModalOpen,
      setJoinModalOpen,
      checkoutStep,
      liveCounter,
      loading,
      authLoading,
      error,
      lastOrderId,
      toast,
      showToast,
      clearToast,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      setGoalFilter,
      setTypeFilter,
      setSearchQuery,
      setCartOpen,
      setDashboardOpen,
      setCheckoutStep,
      placeOrder,
      claimDigitalBlueprint,
      cancelOrder,
      returnOrder,
      updateUserProfile,
      login,
      register,
      googleLogin,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

